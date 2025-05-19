import { PrismaClient, TaskStatus, } from '@prisma/client';
import { CustomError } from '../utils/customError';
import { string } from 'zod';


const prisma = new PrismaClient();

export const getTasks = async () => {
    const tasks = await prisma.$queryRaw`SELECT * FROM "Task"` as any[];
    if (!tasks || tasks.length === 0) {
        throw new CustomError('No tasks found', 404);
    }
    return tasks;
    /*
   const tasks = await prisma.task.findMany();
   if(!tasks){
    throw new CustomError('Failed to fetch tasks', 500);
   }
   return tasks;
   */
}

//due_date: string, 
export const getTasksSearch = async (
    rawid: string,
    title: string,
    status: string,
    due_date: string
) => {
    const conditions = [];
    const params = [];
    const id = rawid ? parseInt(rawid, 10) : undefined;

    if (id) {
    conditions.push(`id = $${params.length + 1}`);
    params.push(id);
  }
// if (id !== undefined) {
//   conditions.push(`id = $${params.length + 1}`);
//   params.push(id);
// }



  if (title) {
    conditions.push(`(title LIKE $${params.length + 1} OR detail LIKE $${params.length + 1})`);
    params.push(`%${title}%`);
  }

  if (status) {
    conditions.push(`status = $${params.length + 1}::"TaskStatus"`);
    params.push(status);
  }

    if (due_date) {
    const parsed = new Date(due_date);
    if (!isNaN(parsed.getTime())) {
        const endDate = new Date(parsed);
        endDate.setDate(endDate.getDate() + 1);

        conditions.push(`due_date < $${params.length + 1}::timestamp`);
        params.push(endDate.toISOString());
    } else {
        throw new Error(`Invalid due_date format: ${due_date}`);
    }
    }


  const whereClause = conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : '';
  const query = `SELECT * FROM "Task" ${whereClause};`;

  const tasks = await prisma.$queryRawUnsafe(query, ...params) as any[];

  return tasks;
};





// export const getTasksSearch = async (title: string, due_date: string, /*status: string*/ ) => {

//     const tasks = await prisma.$queryRaw`SELECT * FROM "Task" WHERE title LIKE ${'%' + title + '%'}
//     AND detail LIKE ${'%' + title + '%'}
//     AND due_date LIKE ${'%' + due_date + '%'}` as any[];
//     /*AND status LIKE ${'%' + status + '%'}*/

//     // const tasks = await prisma.$queryRaw`SELECT * FROM "Task"` as any[];
//     // if (title) {
//     //     const tasks = await prisma.$queryRaw`SELECT * FROM "Task" WHERE title LINE query.title` as any[];
//     // }
//     // if (!tasks || tasks.length === 0) {
//     //     throw new CustomError('No tasks found', 404);
//     // }
//     return tasks;
// }


    
    // // const andConditions = [];
    // if (query.titile) {
    //     andConditions.push({
    //     title: { contains: query.title },
    //     });
    //     andConditions.push({
    //     detail: { contains: query.detail },
    //     });
//     }
//     if (query.due_date) {
//         andConditions.push({
//         due_date: { contains: { equals: new Date(query.due_date) } },
//         });
//     }
//     if (query.status) {
//         andConditions.push({
//         status: { contains: { equals: query.status as TaskStatus } },
//         });
//     }

//     const tasks = await prisma.task.findMany({
//         where: andConditions.length > 0 ? { AND: andConditions } : {},
//     });

//   return tasks
// };const tasks = await prisma.$queryRaw`SELECT * FROM "Task" WHERE titile LINE query.titile` as any[];
    // if (!tasks || tasks.length === 0) {
    //     throw new CustomError('No tasks found', 404);
    // }
    // return tasks;
    /*
   const tasks = await prisma.task.findMany();
   if(!tasks){
    throw new CustomError('Failed to fetch tasks', 500);
   }
   return tasks;
   */



export const getIdTasks = async (id: number) => {
    const tasks = await prisma.$queryRaw`SELECT * FROM "Task" WHERE id = ${id}` as any[];
    if (tasks.length === 0) {
        throw new CustomError('Task not found', 404);
    }
    return tasks;
}

export const getIdSubTasks = async (id: number) => {
    const subtasks = await prisma.$queryRaw`SELECT * FROM "Subtask" WHERE "taskId" = ${id}` as any[];
    if (subtasks.length === 0) {
        throw new CustomError('SUbTask not found', 404);
    }
    return subtasks;
}


export const createTask = async (body: { title: string; detail: string; due_date: string; status: string }) => {
    const task = await prisma.$queryRawUnsafe(
    `INSERT INTO "Task" (title, detail, due_date, status, created_at)
    VALUES ($1, $2, $3, $4::"TaskStatus", NOW())
    RETURNING *` ,
        body.title,
        body.detail,
        new Date(body.due_date),
        body.status
    );
    /*
    const task = await prisma.$queryRaw`
        INSERT INTO "Task" (title, detail, due_date, status, created_at)
        VALUES (${body.title}, ${body.detail}, ${new Date(body.due_date)}, ${body.status}, NOW())
        RETURNING 
    ` as any[];
    return task[0];
*/
}

export const updateTask = async (id: number, body: { title: string; detail: string; due_date: string; status: string }) => {
    const task = await prisma.$queryRaw`
        UPDATE "Task"
        SET title = ${body.title},
            detail = ${body.detail},
            due_date = ${new Date(body.due_date)},
            status = ${body.status}::"TaskStatus"
        WHERE id = ${id}
        RETURNING *
    ` as any[];
    if (!task || task.length === 0) {
        throw new CustomError('Task not found', 404);
    }
    return task[0];
} 


export const deleteTask = async (id: number) => {
        const result = await prisma.$queryRaw`
            DELETE FROM "Task"
            WHERE id = ${id}
            RETURNING id
        ` as any[];
        if (!result || result.length === 0) {
            throw new CustomError('Task not found', 404);
        }
        return result[0];
}

export const getSubtasks = async (taskId: number) => {
        const subtasks = await prisma.$queryRaw`
            SELECT * FROM "Subtask"
            WHERE task_id = ${taskId}
        ` as any[];
        return subtasks;
} 

export const createSubtask = async (taskId: number, body: { title: string; detail: string; status?: string }) => {
        const subtask = await prisma.$queryRaw`
            INSERT INTO "Subtask" (title, detail, status, "taskId", created_at)
            VALUES (${body.title}, ${body.detail}, (${body.status || 'TODO'})::"TaskStatus", ${taskId}, NOW())
            RETURNING *
        ` as any[];
        return subtask[0];
}

export default { getTasks, getIdTasks, getIdSubTasks, createTask, updateTask, deleteTask, getSubtasks, createSubtask };    
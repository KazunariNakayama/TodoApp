CREATE TYPE task_status AS ENUM ('未完了', '進行中', '完了');

CREATE TABLE tasks (
  id         SERIAL PRIMARY KEY,
  title      VARCHAR(20)  NOT NULL,
  detail     VARCHAR(255) NOT NULL,
  status     task_status  NOT NULL DEFAULT '未完了',
  due_date   DATE         NOT NULL,
  created_at TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE TABLE subtasks (
  id         SERIAL PRIMARY KEY,
  task_id    INT NOT NULL
              REFERENCES tasks(id)
              ON DELETE CASCADE,            -- 親が消えれば子も自動削除
  title      VARCHAR(20)  NOT NULL,
  detail     VARCHAR(255) NOT NULL,
  status     task_status  NOT NULL DEFAULT '未完了',
  created_at TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- よく検索するのでインデックス
CREATE INDEX idx_subtasks_task_id ON subtasks(task_id);
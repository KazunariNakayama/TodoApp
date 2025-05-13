CREATE TYPE task_status AS ENUM ('未完了', '進行中', '完了');

CREATE TABLE tasks (
  id         SERIAL PRIMARY KEY,
  parent_id  INT REFERENCES tasks(id) ON DELETE CASCADE,
  title      TEXT        NOT NULL,
  detail     TEXT        NOT NULL,
  status     task_status NOT NULL DEFAULT '未完了',
  due_date   DATE,
  created_at TIMESTAMP   NOT NULL DEFAULT NOW(),
  CHECK (parent_id IS NULL OR parent_id <> id),
  CHECK (
    -- 親あり  ⇒ due_date は必ず NULL
    (parent_id IS NOT NULL AND due_date IS NULL)
    OR
    -- 親なし ⇒ due_date は必須
    (parent_id IS NULL AND due_date IS NOT NULL)
  ),
  CHECK (char_length(title) <= 20),
  CHECK (char_length(detail) <= 255)
);

-- 親が「ルートタスク(parent_id IS NULL)」であることを強制するファンクション
CREATE OR REPLACE FUNCTION trg_tasks_enforce_depth()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.parent_id IS NOT NULL THEN
    -- 親の parent_id が NULL（= ルート）であるか確認
    PERFORM 1
      FROM tasks p
     WHERE p.id = NEW.parent_id
       AND p.parent_id IS NULL;

    IF NOT FOUND THEN
      RAISE EXCEPTION
        'タスク % はすでにサブタスクのため parent_id に指定できません', NEW.parent_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

-- 制約トリガーとして登録（INSERT/UPDATE 両方で発火）
CREATE TRIGGER chk_parent_is_root
BEFORE INSERT OR UPDATE ON tasks
FOR EACH ROW
EXECUTE FUNCTION trg_tasks_enforce_depth();

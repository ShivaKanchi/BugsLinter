type WorkflowStatusSeed = {
  id: string;
  name: string;
  category: "start" | "intermediate" | "end";
  position: number;
};

type WorkflowTransitionSeed = {
  id: string;
  fromStatusId: string;
  toStatusId: string;
  name: string;
};

export function createDefaultWorkflowIds() {
  return {
    backlogStatusId: crypto.randomUUID(),
    todoStatusId: crypto.randomUUID(),
    inProgressStatusId: crypto.randomUUID(),
    reviewStatusId: crypto.randomUUID(),
    doneStatusId: crypto.randomUUID(),
  };
}

export function buildDefaultWorkflow(ids = createDefaultWorkflowIds()) {
  const statuses: WorkflowStatusSeed[] = [
    {
      id: ids.backlogStatusId,
      name: "Backlog",
      category: "start",
      position: 0,
    },
    {
      id: ids.todoStatusId,
      name: "Todo",
      category: "intermediate",
      position: 1,
    },
    {
      id: ids.inProgressStatusId,
      name: "In Progress",
      category: "intermediate",
      position: 2,
    },
    {
      id: ids.reviewStatusId,
      name: "Review",
      category: "intermediate",
      position: 3,
    },
    {
      id: ids.doneStatusId,
      name: "Done",
      category: "end",
      position: 4,
    },
  ];

  const transitions: WorkflowTransitionSeed[] = [
    {
      id: crypto.randomUUID(),
      fromStatusId: ids.backlogStatusId,
      toStatusId: ids.todoStatusId,
      name: "Prioritize",
    },
    {
      id: crypto.randomUUID(),
      fromStatusId: ids.todoStatusId,
      toStatusId: ids.inProgressStatusId,
      name: "Start work",
    },
    {
      id: crypto.randomUUID(),
      fromStatusId: ids.inProgressStatusId,
      toStatusId: ids.reviewStatusId,
      name: "Request review",
    },
    {
      id: crypto.randomUUID(),
      fromStatusId: ids.reviewStatusId,
      toStatusId: ids.doneStatusId,
      name: "Complete",
    },
  ];

  return { statuses, transitions };
}

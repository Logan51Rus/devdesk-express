export enum Status {
  open = "open",
  in_progress = "in_progress",
  resolved = "resolved",
  reopened = "reopened",
}

export enum Priority {
  low = "low",
  medium = "medium",
  high = "high",
  critical = "critical",
}

export interface TaskInput {
    title: string,
    description: string,
    status: Status,
    priority: Priority,
}

export interface ITask extends TaskInput {
    creatorId: string,
}


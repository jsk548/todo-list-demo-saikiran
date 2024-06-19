
================
TODO LIST DOCS
================

The todolist is a task management application that allows you to list your tasks based on Type on personal level like "shopping", "travel", "personal" and on a professional level "work" to manage your projects.

It has a dashboard where you can add a task, mark it as COMPLETED and delete it. At the bottom of this board it also has 2 buttons, one to filter tasks by type, status, priority and another to create task. In the middle area of the board is shown the list of tasks, each task has 2 buttons, one to update it and another one to delete it.

All the tasks are saved and updated in the browser's Local Storage. Each task is a object json that has an identifier number or id, a name and its status.

I used this enum to update the task status and this can be visible by task border top color. I used
red for pending tasks
green for completed tasks
yellow for inprogress tasks.

export enum Status {
    PENDING = "#FF0000",
    INPROGRESS = "#FFFF00",
    COMPLETED = "#00FF00"
};

Priority is visible on the task directly.

export enum Priority {
    LOW = "Low",
    MEDIUM = "Medium",
    HIGH = "High",
    CRITICAL = "Critical",
    NONE = "None"
};

Type of task can be seen before the title of the task.

export enum Type {
    WORK,
    PERSONAL,
    SHOPPING,
    TRAVEL
} 

I used this interface to form task object.

export interface TaskItem {
    id: string;
    name: string;
    status: Status;
    priority: Priority;
    type: Type;
    dueDate: string;
}


I have used pinia for state management. The task deadline is shown with red arrow when the due date is below one week. we can update the task by clicking edit icon and change the task status.

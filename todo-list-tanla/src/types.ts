export enum Status {
    PENDING = "#FF0000",
    INPROGRESS = "#FFFF00",
    COMPLETED = "#00FF00"
};

export enum Priority {
    LOW = "Low",
    MEDIUM = "Medium",
    HIGH = "High",
    CRITICAL = "Critical",
    NONE = "None"
};

export enum Type {
    WORK,
    PERSONAL,
    SHOPPING,
    TRAVEL
} 

export interface TaskItem {
    id: string;
    name: string;
    status: Status;
    priority: Priority;
    type: Type;
    dueDate: string;
}
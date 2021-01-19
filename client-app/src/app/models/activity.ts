export interface IActivity{
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    city: string;
    venue: string;
}

export interface IActivityFormValues extends Partial<IActivity> { // Partial => properties from IActivity are optional
    time?: Date                                                   // Also make time optional with the ?
}

export class ActivityFormValues implements IActivityFormValues {
    id?: string = undefined;
    title: string = '';
    category: string = '';
    description: string = '';
    date?: Date = undefined;
    time?: Date = undefined;
    city: string = '';
    venue: string = '';

    constructor(init?: IActivityFormValues) {
        if (init && init.date) {
            init.time = init.date
        }
        Object.assign(this, init);
    }
}
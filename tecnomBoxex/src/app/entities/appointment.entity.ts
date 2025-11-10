export interface Contact{
    name: string;
    email: string;
    phone?: string;
}

export interface Vehicle{
    make: string;
    model: string;
    year: number;
    licence_plate?: string;
}

export interface AppointmentCreate{
    place_id: number
    appointment_at: Date;
    service_type: string;
    contact: Contact;
    vehicle?: Vehicle;
}

export interface Appointment extends AppointmentCreate{
    id:string;
    created_at: Date;
}
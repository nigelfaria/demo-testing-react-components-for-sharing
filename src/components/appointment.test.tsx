import { render, screen } from '@testing-library/react'
import  userEvent  from '@testing-library/user-event';
import Appointment, { AppointmentProps } from './appointment';

describe('Appointment', () => {
    it(`Given the required props, 
        When the component is rendered
        Then the appointment description should be present`, () => {
        const requiredProps: AppointmentProps = {
            //Any required props
            id: 1,
            person: 'Meenashi',
            description: "A very special appt",
            date: '30 Jan'
        };
        render(<Appointment {...requiredProps} />);

        expect(screen.getByText(requiredProps.description)).toBeInTheDocument();
        expect(screen.getByText(requiredProps.date)).toBeInTheDocument();
        expect(screen.getByText(requiredProps.person)).toBeInTheDocument();
        expect(screen.getByText(requiredProps.id)).toBeInTheDocument();
    });
    it(`Given an unconfirmed appointment,
        When the component is rendered,
        Then the confirm button should be present`, () => {
        const unconfirmedAppointment: AppointmentProps = {
            id: 1,
            person: 'Ponti',
            description: "Something",
            date: '30 Jan',
            onMarkConfirmed: () => { }
        }
        render(<Appointment {...unconfirmedAppointment} />);

        const button = screen.getAllByRole('button').find(b => b.textContent === 'Mark confirmed');
        expect(button).toBeInTheDocument();
    });
    it(`Given an unconfirmed appointment,
    When the component is rendered,
    Then the confirm button should not be present`, () => {
        const confirmedAppointment: AppointmentProps = {
            id: 1,
            person: 'Ponti',
            description: "Something",
            date: '30 Jan',
            confirmed: true,
            onMarkConfirmed: () => { }
        }
        render(<Appointment {...confirmedAppointment} />);

        const button = screen.queryAllByRole('button').find(b => b.textContent === 'Mark confirmed');
        expect(button).toBeUndefined();
        expect(screen.getByText('Confirmed!')).toBeInTheDocument();
    });

    it(`Given an unconfirmed appointment is rendered, 
    When the done button is clicked,
    Then the onMarkConfirmed functionis called with the corrct AppointmentId`, async () => {

        const mockConfirm = jest.fn();
        const unconfirmedAppointment: AppointmentProps = {
            id: 1,
            person: 'Jagath',
            description: 'go shopping',
            date: '30 Jan',
            confirmed: false,
            onMarkConfirmed: mockConfirm,
        }

        render(<Appointment {...unconfirmedAppointment} />);
        const button = screen.getAllByRole('button').find(b => b.textContent === 'Mark confirmed');
        expect(button).toBeInTheDocument();
        if (button) {
            await userEvent.click(button);
        }
        expect(mockConfirm).toHaveBeenCalledTimes(1);
        expect(mockConfirm).toHaveBeenCalledWith(unconfirmedAppointment.id);

    });

});
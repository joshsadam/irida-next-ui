import {
    Form,
    Link,
    Outlet,
} from '@remix-run/react';

export default function AppLayout() {
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <div>
                    <Link to="/">Dashboard</Link> <Link to="/projects">Projects</Link>
                </div>
                <Form action="/logout" method="post">
                    <button>Logout: </button>
                </Form>
            </div>
            <Outlet />
        </div>
    );
}
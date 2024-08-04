import { getSession } from 'next-auth/react';

const AdminDashboard = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome, Admin!</p>
        </div>
    );
};

export async function getServerSideProps (context) {
    const session = await getSession(context);

    if (!session || session.user.role !== 'admin') {
        return {
            redirect: {
                destination: '/denied',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}

export default AdminDashboard;

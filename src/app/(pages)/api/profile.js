import { authenticate } from '../../api/middleware/auth';
import clientPromise from '../../api/lib/mongodb';

export default async function handler(req, res) {
  authenticate(req, res, async () => {
    try {
      const client = await clientPromise;
      const db = client.db('your-db-name');

      const user = await db.collection('users').findOne({ _id: req.user.userId });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ user: { username: user.username, email: user.email } });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error });
    }
  });
}

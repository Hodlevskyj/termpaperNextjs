import { getCurrentUser } from './getCurrentUser';

export default async function handler(req:any, res:any) {
  try {
    const currentUser = await getCurrentUser();
    res.status(200).json(currentUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get current user' });
  }
}

import {getAuth} from '@clerk/express';

const isAuthenticated = (req, res, next) => {
    const auth = getAuth(req);
    if (!auth.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    console.log(`Authenticated user ID: ${auth.userId}`);
    next();
};

export default isAuthenticated;
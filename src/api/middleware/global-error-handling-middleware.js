import ValidationError from '../../domain/errors/validation-error';
import NotFoundError from '../../domain/errors/notFound-error';
import UnauthorizedError from '../../domain/errors/unauthorized-error';
import ForbiddenError from '../../domain/errors/forbidden-error';

const GlobalErrorHandlingMiddleware = (err, req, res, next) => {
    if(err instanceof ValidationError) {
        return res.status(400).json({ message: err.message });
    }else if(err instanceof NotFoundError) {
        return res.status(404).json({ message: err.message });
    }else if(err instanceof UnauthorizedError) {
        return res.status(401).json({ message: err.message });
    }else if(err instanceof ForbiddenError) {
        return res.status(403).json({ message: err.message });
    }else{
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};   

export default GlobalErrorHandlingMiddleware;
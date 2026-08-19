import sanitizeHtml from 'sanitize-html';

export const bodySanitiser = (req, res, next) => {
    const body = req.body;

    for (const key in body) {
        if (typeof body[key] === 'string') {
            body[key] = sanitizeHtml(body[key], {
                allowedTags: [],
                allowedAttributes: {},
            });
        }
    }

    next();
}

export default bodySanitiser;
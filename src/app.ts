import express from 'express';
import 'dotenv/config'
import { ClerkExpressWithAuth, clerkClient } from '@clerk/clerk-sdk-node'
import cors from 'cors'
const app = express();
const port = 3001;

app.use(cors());

app.get('/me', ClerkExpressWithAuth(), async (req: any, res: any) => {
    try {
        if (!req.auth.userId) {
            return res.json({ success: false, message: 'Access denied' });
        }
        const user = await clerkClient.users.getUser(req.auth.userId);
        const data = {
            id: user.id,
            email: user.emailAddresses[0].emailAddress
        }
        res.json({ success: true, data });
    } catch (e) {
        res.json({ success: false, message: e });
    };
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
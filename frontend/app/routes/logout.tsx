import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import {redirect} from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
    console.log('REDIRECTING TO LOGIN');
    return redirect('/login', {
        // headers: {
        //     'Set-Cookie': await destroySession(await getSession(request)),
        // },
    });
};

export const loader: LoaderFunction = () => {
    throw new Response('', { status: 404 });
};
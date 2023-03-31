import Session from 'supertokens-web-js/recipe/session';

export async function doesSessionExist() {
    return await Session.doesSessionExist();
}
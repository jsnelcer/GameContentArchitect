import { Client, Account } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('682ed5cd003a72f4fc29');

export const account = new Account(client);
export { ID } from 'appwrite';

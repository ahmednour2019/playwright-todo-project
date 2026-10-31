import {test, expect} from '@playwright/test';
import {faker} from '@faker-js/faker';
import User from '../models/User';
import UserApi from '../apis/UserApi';
import TodoApi from '../apis/TodoApi';


test.afterEach(async ({page})=>{
    await page.close();
});

test('should be able to add todo',async ({page,request,context})=>{
   // create a user using the User model
   const user= new User();

   // Register the user and get the access token and userID
  const response= await new UserApi(request).register(user);

  // get the access token and userID from the response and set it in the cookie
   const responseBody=await response.json();
   const accessToken=responseBody.access_token;
   const userID=responseBody.userID;
   const firstName=responseBody.firstName;
   console.log(accessToken,userID,firstName);
   user.setAccessToken(accessToken);
   await context.addCookies([
   {
      name:'access_token',
      value: accessToken,
      url: 'https://todo.qacart.com'
   },
   {
      name:'firstName',
      value: firstName,
      url: 'https://todo.qacart.com'

   },
   {
      name:'userID',
      value: userID,
      url: 'https://todo.qacart.com'

   },
]);
// Add TODO using API
  await  new TodoApi(request).addTodo(user);
    
   // await  page.goto('/signup');
   // await page.getByTestId('first-name').fill(faker.person.firstName());
   // await page.getByTestId('last-name').fill(faker.person.lastName());
   // await page.getByTestId('email').fill(faker.internet.email());
   // await page.getByTestId('password').fill('P@ssw0rd00');
   // await page.getByTestId('confirm-password').fill('P@ssw0rd00');
   // await page.getByTestId('submit').click();
//    const welcomeMessage= await page.getByTestId('welcome');
//    expect(welcomeMessage).toBeVisible;
// ADD TODO using API

   // await page.getByTestId('add').click();
   // await page.getByTestId('new-todo').fill('Playwright');
   // await page.getByTestId('submit-newTask').click();

  
   await  page.goto('/todo'); 
   const todoText= await page.getByTestId('todo-text').nth(0).textContent();
   expect(todoText).toEqual('Playwright');


});
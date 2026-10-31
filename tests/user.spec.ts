import {test, expect} from '@playwright/test';
import User from '../models/User';
import {faker} from '@faker-js/faker';
import UserApi from '../apis/UserApi';
import config from '../playwright.config';

test('should be able to register to todo website',async ({page})=>{
   const user= new User();
   await  page.goto('/signup');
   await page.getByTestId('first-name').fill(user.getFirstName());
   await page.getByTestId('last-name').fill(user.getLastName());
   await page.getByTestId('email').fill(user.getEmail());
   await page.getByTestId('password').fill(user.getPassword());
   await page.getByTestId('confirm-password').fill('P@ssw0rd00');
   await page.getByTestId('submit').click();
   await page.getByTestId('confirm-password').fill('Ahmed123');
   const welcomeMessage= await page.getByTestId('welcome');
   expect(welcomeMessage).toBeVisible;

});

test('should be able to register using API to todo website',async ({page,request,context})=>{
   const user= new User();
   const response=await new UserApi(request).register(user);
   const responseBody= await response.json();
   const accessToken=responseBody.access_token;
   const userID=responseBody.userID;
   const firstName=responseBody.firstName;

   console.log("value of accessToken is : "+accessToken)
   console.log("value of userID is : "+userID);
   console.log("value of firstName is : "+firstName);

   user.setAccessToken(accessToken);
   await context.addCookies([
   {
      name:'access_token',
      value: accessToken,
      url: config.use?.baseURL
   },
   {
      name:'firstName',
      value: firstName,
      url: config.use?.baseURL

   },
   {
      name:'userID',
      value: userID,
      url: config.use?.baseURL

   },
]);
   await  page.goto('/todo');
   const welcomeMessage= await page.getByTestId('welcome').innerText();
   expect(welcomeMessage).toEqual("TIME TO SLEEP "+user.getFirstName().toUpperCase());

});
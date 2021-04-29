# Qmee tech test

# The problem
At Qmee we have a lot of users doing surveys. 
We like to let our users know up front how long a survey on their dashboard takes. 
We get our surveys from many different providers and sometimes the duration they estimated a given survey will take is not very good. 
Once some of our users have taken a survey we can look at how long they took and estimate what the real duration of the survey is. 


We have created an endpoint `GET /survey-completed-event` that returns single events of when a user completes a survey. The JSON data returned by the endpoint looks as follows:

```
{
  "startTime": "2021-04-29T15:52:47.401Z",
  "endTime": "2021-04-29T16:04:11.656Z",
  "surveyId": 2
}
```
The `startTime` for this event is the time a user has started the survey and the `endTime` is when they completed it. 
Furthermore every event contains a `surveyId` that can be used to identify a survey. There can be many different surveys each with their own ID. 
Every survey can have multiple starts by different users and therefore multiple events associated with it.

# The task
Write a short program that looks at multiple events and works out the average time each survey takes.
Tell us the average time in minutes each survey returned by the endpoint takes. (There is a finite number of surveys)

## Bonus task
What other information can you collect that is helpful to the user and allow them to make a more informed decision when choosing a survey.
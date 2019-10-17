import * as yup from 'yup';

const title = yup.string()
  .required('NotificationTitleRequired')
  .max(30, 'InvalidNotificationTitleLength');

const message = yup.string()
  .required('NotificationMessageRequired')
  .max(120, 'InvalidNotificationMessageLength');

const userList = yup.string()
  .required('UserListRequired');

const serverKey = yup.string()
  .required('ServerKeyRequired');

export const pushSchema = yup.object({
  userList,
  title,
  message,
  serverKey
})

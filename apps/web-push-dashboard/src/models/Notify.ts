export interface Notify {
  title: string;
  message: string;
}

export type FormValues = {
  notifications: Notify[];
};

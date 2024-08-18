import State, { EState } from '../store/state';

export default (text?: string) => {
  const username = State.getInstance().get(EState.USER_FULL_NAME) ?? '';
  const displayUsername = username ? ` ${username.toUpperCase()} ` : '';
  let subtitle: string = '';

  if (!text) subtitle = '-'.repeat(87);
  if (text) subtitle = `-- ${text.toUpperCase()} ${'-'.repeat(74 - text.length - (username?.length ?? 0))}${displayUsername}--\n`;

  const title = `
 _____                _                         _____              _             
|  ___|              | |                       |_   _|            | |            
| |__ _ __ ___  _ __ | | ___  _   _  ___  ___    | |_ __ __ _  ___| | _____ _ __ 
|  __| '_   _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\   | | '__/ _  |/ __| |/ / _ \\ '__|
| |__| | | | | | |_) | | (_) | |_| |  __/  __/   | | | | (_| | (__|   <  __/ |   
\\____/_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|   \\_/_|  \\__,_|\\___|_|\\_\\___|_|   
               | |             __/ |                                             
               |_|            |___/
`;
  console.clear();
  console.log(title);
  console.log(subtitle);
};

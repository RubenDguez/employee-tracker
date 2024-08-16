export default (text?: string) => {
	let subtitle: string = '';

	if (!text) subtitle = '-'.repeat(81);
	if (text) subtitle = `-- ${text} ${'-'.repeat(77 - text.length)}\n`;

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

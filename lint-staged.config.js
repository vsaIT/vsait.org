module.exports = {
   // Type check TypeScript files
   '**/*.(ts|tsx)': () => 'yarn tsc --noEmit',

   // Lint then format TypeScript and JavaScript files
   '**/*.(ts|tsx|js|jsx)': (filenames) => [
     `yarn eslint --fix ${filenames.join(' ')}`,
     `yarn prettier --write ${filenames.join(' ')}`,
   ],
 
   // Format css files
   '**/*.(css|scss)': (filenames) => [
     `npx prettier --write ${filenames.join(' ')}`,
   ],
 
   // Format MarkDown and JSON
   '**/*.(md|json)': (filenames) =>
     `yarn prettier --write ${filenames.join(' ')}`,
};

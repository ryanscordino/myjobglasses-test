# Repository by Ryan Scordino, for the MyJobGlasses Technical Interview  

Hello! Happy to see you here! Here are a few notes about what I've done:  

## Frontend / React  

### Things I'm Proud Of  

For the global architecture, I used Next.JS, since I’m familiar with it and it provides most of the tools needed for this test. For styling, I used a mix of custom Shadcn components and TailwindCSS-based custom components and containers.  

I implemented some parts with a `client-side` approach, such as the homepage, and others with a `server-side` approach, to demonstrate my ability to handle both.  

### Things That Could Be Improved  

A quick note about the filters on the "All Characters" page: working with forms and filters is not my favorite thing to program, so the code might look a bit rough around the edges. Additionally, while I’ve tried to cover most edge cases, there’s always room for improvement in handling every possible scenario.  

### Deployment  

If you'd like to see it live, I’ve deployed the project on Vercel: [https://rick-and-morty-kappa-gules.vercel.app/](https://rick-and-morty-kappa-gules.vercel.app/).  
To run it locally, just launch the server with `npm run dev`.  

## Backend / Ruby  

### Things I'm Proud Of  

Ruby isn’t a language I’m deeply experienced with, but I REALLY enjoyed coding in Ruby. I’ve read articles for few years about Ruby’s philosophy and was already familiar with its syntax, but I was surprised by how much I enjoyed writing in the “Ruby way” (making use of blocks, `.inject()`, modules, minimal imports, function less than 10 lines, etc).  

The code works, and I’ve handled a few edge cases to ensure errors are properly managed when:  
- the JSON file does not exist  
- the JSON file isn’t valid  
- the input file is not specified
- the output file name is not specified, which then use the default file name `output.csv` 

### Things That Could Be Improved  

There’s always room for improvement. We could address more edge cases, and the algorithm could possibly be optimized for better performance. Additionally, I have pushed some test files, but there's room to add more.  

### Deployment  

The code isn’t deployed on any web server, but it can be tested locally by running:  
`ruby main.rb input_file output_file`  

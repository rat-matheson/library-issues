require('ts-node').register({

    // This seems to solve an include/compilation issue of some sort that I can't debug further
    require:[
      "tsconfig-paths/register",
      "./register.reflect-metadata"
    ],
    project: 'tsconfig.json',
  });

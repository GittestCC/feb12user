export const kintoBlockServices = {
  mongodb: {
    title: 'MongoDB',
    description: 'Powerful No-SQL Database for your KintoBlocks and Applications',
    longDescription: 'After activating MongoDB here, you will make it possible to add Database capabilities to your KintoBlocks and Applications - simply add it as a dependency in the dedicated section of your chosen project on KintoHub.',
    type: 'MONGO_DB'
  },
  messagePassing: {
    title: 'Message Passing',
    description: 'Queuing services and message routing for your KintoBlocks and Applications',
    longDescription: 'I am thou, thou art I... Thou hast acquired a new vow. It shall become the wings of rebellion that breaketh thy chains of captivity. With the birth of the Chariot Persona, I have obtained the winds of blessing that shall lead to freedom and new power...',
    type: 'MESSAGE_PASSING',
  },
  sharedMemory: {
    title: 'Shared Memory',
    description: 'Make memory available across your different KintoBlocks',
    longDescription: 'I am thou, thou art I... Thou hast acquired a new vow. It shall become the wings of rebellion that breaketh thy chains of captivity. With the birth of the Chariot Persona, I have obtained the winds of blessing that shall lead to freedom and new power...',
    type: 'SHARED_MEMORY',
  }
}

export const analyticsServices = {
  kibana: {
    title: 'Kibana',
    description: 'Insightful data visualization for your Applications. Activate once to start tracking all applications in the current workspace.',
    longDescription: 'After activating Kibana here, you will be able to use its data vizualisation tools for all the applications deployed from this workspace. Simply click "open" and Kibana will open in a new tab, with the data from your applications at your disposal.',
    type: 'KIBANA'
  },
  prometheus: {
    title: 'Prometheus',
    description: 'Monitoring & alerting for your Applications. Activate once to start tracking all applications in the current workspace.',
    longDescription: 'After activating Prometheus here, you will be able to use its monitoring and alert tools for all the applications deployed from this workspace. Simply click "open" and Prometheus will open in a new tab, fed by your applications.',
    type: 'PROMETHEUS'
  },
  zipkin: {
    title: 'Jaeger',
    description: 'Advanced Tracing for your Applications. Activate once to start tracking timing data for all applications in the current workspace.',
    longDescription: 'After activating Jaeger here, you will be able to use its timing and tracing tools for all the applications deployed from this workspace. Simply click "open" and Jaeger will open in a new tab, fed by your applications.',
    type: 'ZIPKIN'
  }
}

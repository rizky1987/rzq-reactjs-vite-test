type LogContext = {
  location: string;
  userId?: string;
  payload?: any;
};

export const logger = {
  error: async (message: string, error: unknown, context: LogContext) => {
    const timestamp = new Date().toISOString();
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : '';

    const formattedLog = {
      level: 'ERROR',
      timestamp,
      location: context.location,
      message,
      detail: errorMessage,
      userId: context.userId || null,
      payload: context.payload || null,
      stack: errorStack
    };

    console.error(
      `[ERROR][${timestamp}][${context.location}] 🚨 ${message}\n` +
      `Detail: ${errorMessage}\n` +
      (context.userId ? `User ID: ${context.userId}\n` : '') +
      `Stack Trace: ${errorStack}\n`
    );

    if (process.env.NODE_ENV === 'production') {
      try {
        await fetch('https://api.logprovider.com/v1/logs', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.LOG_PROVIDER_API_KEY}`
          },
          body: JSON.stringify(formattedLog)
        });
      } catch (sendError) {
        console.error('❌ Failed to send ERROR to clound :', sendError);
      }
    }
  },
  
  warn: async (message: string, context: LogContext) => {
    const timestamp = new Date().toISOString();

    const formattedLog = {
      level: 'WARN',
      timestamp,
      location: context.location,
      message,
      userId: context.userId || null,
      payload: context.payload || null,
    };

    console.warn(
      `[WARN][${timestamp}][${context.location}] ⚠️ ${message}\n` +
      (context.userId ? `User ID: ${context.userId}\n` : '') +
      (context.payload ? `Context Payload: ${JSON.stringify(context.payload)}\n` : '')
    );

    if (process.env.NODE_ENV === 'production') {
      try {
        await fetch('https://api.logprovider.com/v1/logs', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.LOG_PROVIDER_API_KEY}`
          },
          body: JSON.stringify(formattedLog)
        });
      } catch (sendError) {
        console.error('❌ Failed to send WARN to clound :', sendError);
      }
    }
  }
};
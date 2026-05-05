import * as amplitude from '@amplitude/unified';
import { plugin as engagementPlugin } from '@amplitude/engagement-browser';

amplitude.initAll('485a1bcc4508532d7be409a333a868c7', {
  analytics: {
    autocapture: true,
  },
  sessionReplay: {
    sampleRate: 1,
  },
});

amplitude.add(engagementPlugin());

export default amplitude;

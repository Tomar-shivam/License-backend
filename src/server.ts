/**
 * @name server
 *
 * @description The entry point for the app
 */

import app from ".";
import { secretUtil } from './utils/secretutil';

// // start listening to server on specified port
  ((port = secretUtil.PORT || 3006) => {
    app.server.listen(port, () => console.log(`> Listening on port ${port}`));
  })();

import { Router } from 'express'
import logger from '../utils/logger.js'

const router = Router()

router.get('/loggerTest', (req, res) => {
  logger.debug('Este es un mensaje de depuración (debug)');
  logger.info('Este es un mensaje informativo (info)');
  logger.warn('Este es un mensaje de advertencia (warning)');
  logger.error('Este es un mensaje de error (error)');
  logger.fatal('Este es un mensaje de error fatal (fatal)');
  res.send('Logs de prueba generados. Verifique la salida del logger.');
})

export default router

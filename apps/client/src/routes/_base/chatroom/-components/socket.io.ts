import { io, Socket } from 'socket.io-client'

const URL = import.meta.env.VITE_SERVER_URL
export const socket: Socket = io(URL, {
  transports: ['websocket'],
  secure: true
})

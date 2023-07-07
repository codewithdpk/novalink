import { ConnectionType } from "../lib/@types/provider"


export interface ConnectionProviderProps {
    appName: string
    rpcUrls: ConnectionRpcUrls
    defaultChainId: number
    allowedProviders: ConnectionType[]
    walletConnectProjectId?:string
}

export interface ConnectionRpcUrls {
    [key: number]: string
}
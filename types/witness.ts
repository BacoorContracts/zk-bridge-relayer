export type Witness = {
    //  public snark inputs
    root: string,
    value: string,
    token: string,
    nullifierHash: string,
    fee: string,
    relayer: string,
    recipient: string,

    //  private snark inputs
    nullifier: string,
    pathIndices: number[]
    pathElements: string[][]
}
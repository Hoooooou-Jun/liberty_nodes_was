import * as anchor from "@coral-xyz/anchor";
import { LibertyNodes } from "../types/liberty_nodes.ts";
import IDL from '../idl/liberty_nodes.json' assert { type: "json" };

const createAnchorProvider = () => {
  const connection = new anchor.web3.Connection("http://localhost:8899", "confirmed");
  const keypair = anchor.web3.Keypair.fromSecretKey(anchor.web3.Keypair.generate().secretKey);
  const wallet = new anchor.Wallet(keypair);
  const provider = new anchor.AnchorProvider(connection, wallet, { commitment: "processed" });

  anchor.setProvider(provider);
  return { provider, program: new anchor.Program(IDL as LibertyNodes) };
};

export default createAnchorProvider;

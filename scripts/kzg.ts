import * as cKzg from "c-kzg";
import { setupKzg } from "viem";

export const kzg = setupKzg(cKzg, "./trusted_setup/trusted_setup_4096.json");

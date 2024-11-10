var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const designerOpportunity = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
export const developerOpportunity = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
export const dsaStuff = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
export const flex = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
export const jobOpportunity = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });

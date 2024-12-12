import axios, { AxiosRequestConfig } from "axios";
import { ENVS } from "../constants";

export const getVoices = () => {
    return axios.get(`${ENVS.domain}/api/v1/voices`);
}

export const textToVoice = (body: { text: String, voiceId: String }, options?: AxiosRequestConfig) => {
    return axios.post(`${ENVS.domain}/api/v1/synthesize`, body, { ...options });
}
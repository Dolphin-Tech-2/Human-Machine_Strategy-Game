import { instanseAxios } from "./useAxios";

import { request } from "../interface/request.interface";

export const postColocarPieza = async (data: request, pieza: string) => {
  try {
    pieza = pieza.toLowerCase();
    const response = await instanseAxios.post(
      `/reglas/colocar_pieza_${pieza}/`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postEstadoMeta = async (data: request) => {
  try {
    const response = await instanseAxios.post("/reglas/estado_meta/", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postGenerarJugadaMinMax = async (data: request) => {
  try {
    const response = await instanseAxios.post("/reglas/jugar_turno/", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postGenerarJugadaAleatorio = async (data: request) => {
  try {
    const response = await instanseAxios.post("/reglas/jugar_aleatorio/", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const postGenerarJugadaGreedy = async (data: request) => {
  try {
    const response = await instanseAxios.post(
      "/reglas/jugar_turno_greedy/",
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

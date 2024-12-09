//import axios from 'axios';
import api from '../api';
import { AuthService } from '../Auth/authService';

// Configuración de la URL base
//const BASE_URL = `${import.meta.env.VITE_BASE_URL}/estudiante`;

// DTOs: Definición de interfaces para garantizar la estructura de los datos
export interface EstudiantePatchRequestDto {
  firstName?: string; // Campo opcional
  lastName?: string; // Campo opcional
  phoneNumber?: string; // Campo opcional
  email?: string; // Campo opcional
  password?:string; // Campo opcional
  fotoPerfilUrl?:string; // Campo opcional
}

export interface EstudianteRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface EstudianteResponseDto {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  fotoPerfilUrl: string;
}

export interface EstudianteSelfResponseDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  fotoPerfilUrl:string; 
}

export interface IncidenteResponseDto {
  id: number;
  piso: string;
  detalle: string;
  ubicacion: string;
  estadoReporte: EstadoReporte;
  estadoTarea: EstadoTarea;
  email: string;
  phoneNumber: string;
  description?: string;
  estudianteId?: number;
  empleadoId?: number;
  fechaReporte: string;
  fotoIncidenteUrl:string;
}

export interface ObjetoPerdidoResponseDto {
  id: number;
  piso: string;
  ubicacion: string;
  estadoReporte: EstadoReporte;  // O enum, dependiendo del tipo en el backend
  estadoTarea: EstadoTarea;    // O enum, dependiendo del tipo en el backend
  detalle: string;
  email: string;
  phoneNumber: string;
  fechaReporte: string;
  fotoObjetoPerdidoUrl:string;
}

// Enums de Estado
export enum EstadoReporte {
  RECHAZADO = 'RECHAZADO',
  PENDIENTE = 'PENDIENTE',
  ACEPTADO = 'ACEPTADO',
}

export enum EstadoTarea {
  NO_FINALIZADO = 'NO_FINALIZADO',
  FINALIZADO = 'FINALIZADO',
}

// Servicio para las operaciones relacionadas con Estudiante
export class EstudianteService {
  private getToken() {
    return AuthService.getToken();
  }

  // Obtener todos los estudiantes
  async getAllEstudiantes(): Promise<EstudianteResponseDto[]> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No autorizado. El token de autenticación no está presente.');
    }
    const response = await api.get<EstudianteResponseDto[]>('/estudiante/lista', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  // Obtener información de un estudiante por ID
  async getEstudiante(id: number): Promise<EstudianteResponseDto> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No autorizado. El token de autenticación no está presente.');
    }
    const response = await api.get<EstudianteResponseDto>(`/estudiante/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  // Obtener la información del estudiante autenticado
  async getEstudianteOwnInfo(): Promise<EstudianteSelfResponseDto> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No autorizado. El token de autenticación no está presente.');
    }
    const response = await api.get<EstudianteSelfResponseDto>('/estudiante/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  // Crear un nuevo estudiante
  async createEstudiante(dto: EstudianteRequestDto): Promise<EstudianteResponseDto> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No autorizado. El token de autenticación no está presente.');
    }
    const response = await api.post<EstudianteResponseDto>('/estudiante', dto, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  // Actualizar información del estudiante autenticado
  async updateEstudianteInfo(
    dto: EstudiantePatchRequestDto,
    fotoPerfil: File | null
  ): Promise<EstudianteResponseDto> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No autorizado. El token de autenticación no está presente.');
    }

    const formData = new FormData();
    formData.append('estudiante', JSON.stringify(dto));
    if (fotoPerfil) {
      formData.append('fotoPerfil', fotoPerfil);
    }

    const response = await api.patch<EstudianteResponseDto>('/estudiante/me', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  // Eliminar un estudiante por ID
  async deleteEstudiante(id: number): Promise<void> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No autorizado. El token de autenticación no está presente.');
    }
    await api.delete(`/estudiante/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Obtener los incidentes asociados al estudiante autenticado
  async getEstudianteIncidentes(): Promise<IncidenteResponseDto[]> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No autorizado. El token de autenticación no está presente.');
    }
    const response = await api.get<IncidenteResponseDto[]>('/estudiante/me/incidentes', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  // Obtener los objetos perdidos asociados al estudiante autenticado
  async getEstudianteObjetosPerdidos(): Promise<ObjetoPerdidoResponseDto[]> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No autorizado. El token de autenticación no está presente.');
    }
    const response = await api.get<ObjetoPerdidoResponseDto[]>('/estudiante/me/objetos-perdidos', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  // Reportar un objeto perdido
  async reportarObjetoPerdido(dto: ObjetoPerdidoResponseDto): Promise<ObjetoPerdidoResponseDto> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No autorizado. El token de autenticación no está presente.');
    }
    const response = await api.post<ObjetoPerdidoResponseDto>('/estudiante/me/objetos-perdidos', dto, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  // Actualizar estado de un objeto perdido
  async actualizarEstadoObjetoPerdido(
    id: number,
    estadoReporte: string,
    estadoTarea: string
  ): Promise<ObjetoPerdidoResponseDto> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No autorizado. El token de autenticación no está presente.');
    }
    const response = await api.patch<ObjetoPerdidoResponseDto>(
      `/estudiante/me/objetos-perdidos/${id}`,
      { estadoReporte, estadoTarea },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
}

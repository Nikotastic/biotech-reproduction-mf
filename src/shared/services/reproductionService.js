import apiClient from "../utils/apiClient";

/**
 * Reproduction Service
 * All calls go to POST/GET/PUT /api/v1/Reproduction
 */
export const reproductionService = {
  // ── POST /api/v1/Reproduction ──────────────────────────────────────────
  createEvent: async (eventData) => {
    const response = await apiClient.post("/v1/Reproduction", eventData);
    return response.data;
  },

  // ── GET /api/v1/Reproduction/{id} ─────────────────────────────────────
  getEventById: async (id) => {
    const response = await apiClient.get(`/v1/Reproduction/${id}`);
    return response.data;
  },

  // ── GET /api/v1/Reproduction/farm/{farmId} ────────────────────────────
  // Optional: fromDate, toDate, page, pageSize
  getEventsByFarm: async (farmId, params = {}) => {
    const query = new URLSearchParams();
    if (params.fromDate) query.append("fromDate", params.fromDate);
    if (params.toDate) query.append("toDate", params.toDate);
    if (params.page) query.append("page", params.page);
    if (params.pageSize) query.append("pageSize", params.pageSize);
    const qs = query.toString();
    const response = await apiClient.get(
      `/v1/Reproduction/farm/${farmId}${qs ? `?${qs}` : ""}`,
    );
    return response.data;
  },

  // ── GET /api/v1/Reproduction/farm (context from JWT) ──────────────────
  getEventsByFarmContext: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.fromDate) query.append("fromDate", params.fromDate);
    if (params.toDate) query.append("toDate", params.toDate);
    if (params.page) query.append("page", params.page);
    if (params.pageSize) query.append("pageSize", params.pageSize);
    const qs = query.toString();
    const response = await apiClient.get(
      `/v1/Reproduction/farm${qs ? `?${qs}` : ""}`,
    );
    return response.data;
  },

  // ── GET /api/v1/Reproduction/animal/{animalId} ────────────────────────
  getEventsByAnimal: async (animalId, params = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.append("page", params.page);
    if (params.pageSize) query.append("pageSize", params.pageSize);
    const qs = query.toString();
    const response = await apiClient.get(
      `/v1/Reproduction/animal/${animalId}${qs ? `?${qs}` : ""}`,
    );
    return response.data;
  },

  // ── GET /api/v1/Reproduction/type/{type} ──────────────────────────────
  getEventsByType: async (type, params = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.append("page", params.page);
    if (params.pageSize) query.append("pageSize", params.pageSize);
    const qs = query.toString();
    const response = await apiClient.get(
      `/v1/Reproduction/type/${type}${qs ? `?${qs}` : ""}`,
    );
    return response.data;
  },

  // ── PUT /api/v1/Reproduction/{id}/cancel ──────────────────────────────
  cancelEvent: async (id) => {
    const response = await apiClient.put(`/v1/Reproduction/${id}/cancel`);
    return response.data;
  },

  // ── PENDIENTE BACKEND: GET /api/v1/Reproduction/pregnancies/farm/{farmId} ──
  // Used by PregnancyTracking.jsx — endpoint NOT yet implemented in backend.
  // Will return empty list gracefully until backend adds it.
  getPregnanciesByFarm: async (farmId) => {
    try {
      const response = await apiClient.get(
        `/v1/Reproduction/pregnancies/farm/${farmId}`,
      );
      const data = response.data;
      return Array.isArray(data) ? data : (data?.data ?? data?.items ?? []);
    } catch (error) {
      console.warn(
        "GET /v1/Reproduction/pregnancies/farm — endpoint not yet available:",
        error?.response?.status,
      );
      return [];
    }
  },

  // ── PENDIENTE BACKEND: GET /api/v1/Reproduction/births/farm/{farmId} ──
  // Used by BirthRegistry.jsx — endpoint NOT yet implemented in backend.
  getBirthsByFarm: async (farmId) => {
    try {
      const response = await apiClient.get(
        `/v1/Reproduction/births/farm/${farmId}`,
      );
      const data = response.data;
      return Array.isArray(data) ? data : (data?.data ?? data?.items ?? []);
    } catch (error) {
      console.warn(
        "GET /v1/Reproduction/births/farm — endpoint not yet available:",
        error?.response?.status,
      );
      return [];
    }
  },

  // ── PENDIENTE BACKEND: POST /api/v1/Reproduction/births ──────────────
  postBirth: async (birthData) => {
    const response = await apiClient.post("/v1/Reproduction/births", birthData);
    return response.data;
  },
};

export default reproductionService;

import { useState } from "react";
import {
  Save,
  AlertCircle,
  Heart,
  Stethoscope,
  Baby,
  Scissors,
} from "lucide-react";
import { motion } from "framer-motion";

export function ReproductionEventForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    animalId: "",
    eventType: "Inseminacion",
    eventDate: new Date().toISOString().split("T")[0],
    notes: "",
    technician: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!formData.animalId) {
        throw new Error("El ID del animal es requerido");
      }

      await onSubmit({
        ...formData,
        animalId: Number(formData.animalId),
      });
    } catch (err) {
      setError(err.message || "Error al guardar");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles =
    "w-full px-5 py-3.5 rounded-2xl border border-gray-100 bg-white focus:ring-4 focus:ring-pink-500/5 focus:border-pink-500/30 outline-none transition-all font-semibold text-gray-800 placeholder:text-gray-300 shadow-sm text-sm";
  const labelStyles =
    "flex flex-col gap-1 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1";

  const getEventIcon = (type) => {
    switch (type) {
      case "Inseminacion":
        return <Scissors className="w-5 h-5" />;
      case "Palpacion":
        return <Stethoscope className="w-5 h-5" />;
      case "Parto":
        return <Baby className="w-5 h-5" />;
      default:
        return <Heart className="w-5 h-5" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full my-4 md:my-6 bg-white rounded-2xl md:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden"
    >
      {/* Header Area */}
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl group shadow-lg">
        <div
          className="relative min-h-[180px] md:h-48 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544026248-cda6d5dd0e6d?q=80&w=2070&auto=format&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-900/90 via-rose-800/85 to-red-900/90" />
          <div className="relative h-full flex flex-col justify-center px-6 md:px-8 py-6 md:py-0 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-pink-300/20 rounded-xl backdrop-blur-md">
                    <Heart className="w-6 h-6 md:w-8 md:h-8 text-pink-300" />
                  </div>
                  <h2 className="text-xl md:text-3xl font-bold tracking-tight">
                    Nuevo Ciclo o Evento
                  </h2>
                </div>
                <p className="text-pink-100/80 text-sm md:text-lg max-w-xl font-medium">
                  Configura detalles reproductivos y registros clínicos para
                  trazabilidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6 md:p-10 lg:p-14 space-y-10 md:space-y-12"
      >
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-2xl flex items-center gap-3 text-xs font-bold uppercase tracking-wider shadow-sm">
            <AlertCircle className="w-5 h-5" /> {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 md:w-6 md:h-6 text-pink-600 rounded flex items-center justify-center bg-pink-50 overflow-hidden">
                <span className="text-[10px] font-bold">#</span>
              </div>
              <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.2em]">
                IDENTIFICACIÓN E HITOS
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelStyles}>
                  ID Animal
                  <span className="text-[9px] text-gray-300 tracking-normal">
                    (NUMÉRICO)
                  </span>
                </label>
                <input
                  type="number"
                  required
                  value={formData.animalId}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      animalId: e.target.value,
                    }))
                  }
                  className={inputStyles}
                  placeholder="Ej. 102"
                />
              </div>

              <div>
                <label className={labelStyles}>Tipo de Evento</label>
                <select
                  value={formData.eventType}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      eventType: e.target.value,
                    }))
                  }
                  className={inputStyles}
                >
                  <option value="Celo">CELO (HEAT)</option>
                  <option value="Inseminacion">INSEMINACIÓN</option>
                  <option value="Palpacion">PALPACIÓN</option>
                  <option value="Parto">PARTO</option>
                  <option value="Aborto">ABORTO</option>
                  <option value="Secado">SECADO</option>
                </select>
              </div>
            </div>

            <div className="bg-pink-50/50 p-5 rounded-2xl border border-pink-100 flex items-start gap-3 mt-4">
              <span className="text-pink-500 text-lg mt-0.5 font-black uppercase">
                i
              </span>
              <p className="text-pink-800 text-xs sm:text-sm font-medium leading-relaxed">
                Elige de forma precisa el tipo de evento; esto actualizará
                automáticamente el estado fisiológico de la madre.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 2: METRICS */}
        <div className="bg-gray-50/50 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 border border-gray-100/50 space-y-8 md:space-y-10">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 md:w-6 md:h-6 text-pink-600 rounded flex items-center justify-center bg-pink-50 overflow-hidden">
              <span className="text-xs font-bold">$</span>
            </div>
            <h3 className="text-[11px] font-black text-gray-900 uppercase tracking-[0.2em]">
              FECHA Y RESPONSABLE CLÍNICO
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelStyles}>Fecha Exacta</label>
              <input
                type="date"
                required
                value={formData.eventDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    eventDate: e.target.value,
                  }))
                }
                className={inputStyles}
              />
            </div>
            <div>
              <label className={labelStyles}>Técnico / Responsable</label>
              <input
                type="text"
                value={formData.technician}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    technician: e.target.value,
                  }))
                }
                className={inputStyles}
                placeholder="Nombre del especialista"
              />
            </div>
          </div>

          <div>
            <label className={labelStyles}>Notas Clínicas / Descripción</label>
            <textarea
              rows="3"
              value={formData.notes}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, notes: e.target.value }))
              }
              className={`${inputStyles} resize-none`}
            />
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-6 pt-10 border-t border-gray-50">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-gray-400 hover:text-gray-900 font-black text-[10px] uppercase tracking-widest transition-all text-center"
            >
              DESCARTAR EVENTO
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto flex items-center justify-center gap-4 px-8 md:px-12 py-4 md:py-5 rounded-xl md:rounded-[1.5rem] bg-pink-600 hover:bg-pink-700 text-white font-black text-[11px] md:text-[13px] uppercase tracking-[0.2em] shadow-xl md:shadow-2xl shadow-pink-900/40 transition-all border border-pink-400/20 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4 text-pink-200" />
                  CONFIRMAR REGISTRO
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}

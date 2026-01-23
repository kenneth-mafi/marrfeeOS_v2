import { useState } from "react";
import { WideButton } from "../buttons/WideButton";
import "./styles/formTemplate.css";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../hooks/useContexts";

/**
 * FormTemplate
 *
 * Generic form renderer driven entirely by configuration.
 * Handles:
 * - Default state initialization
 * - Validation
 * - Error handling
 * - Submission routing
 *
 * @param {Object} props
 * @param {Object} props.formContent - Declarative form definition
 * @returns {JSX.Element} Rendered form
 */
function FormTemplate({ formContent = {} }) {

  /**
   * @hook useNotification
   * @description
   * Used to display global success/error messages
   */
  const { showNotification } = useNotification();

  /**
   * @constant defaultState
   * @description
   * Dynamically constructed initial state for all fields
   */
  const defaultState = {};

  /**
   * @constant group
   * @description
   * Optional transaction group (e.g. "income", "expense")
   */
  const group = formContent.group;

  const navigate = useNavigate();

  /**
   * Navigates back to previous page
   */
  const goBack = () => {
    navigate(-1);
  };

  /**
   * Build default form state from formContent.default
   */
  (formContent.default || []).forEach(def => {
    defaultState[def.name] = def.value;
  });

  /**
   * @state formData
   * @description
   * Centralized state for all form inputs
   */
  const [formData, setFormData] = useState(defaultState);

  /**
   * @state errors
   * @description
   * Field-level validation errors
   */
  const [errors, setErrors] = useState({});


  // ================= ERROR HANDLING =================

  /**
   * Clears error for a specific field
   *
   * @param {string} field - Field name
   */
  const clearError = (field) => {
    setErrors(prev => {
      if (!prev[field]) return prev;

      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };


  // ================= VALIDATION =================

  /**
   * Validates formData against formContent.validation rules
   *
   * Supported rules:
   * - required
   * - min
   *
   * @returns {boolean} Whether form is valid
   */
  const validate = () => {
    const rules = formContent.validation || {};
    const newErrors = {};

    Object.keys(rules).forEach(field => {
      const value = formData[field];
      const rule = rules[field];

      if (rule.required && !value) {
        newErrors[field] = "This field is required";
      }

      if (rule.min !== undefined && Number(value) < rule.min) {
        newErrors[field] = "Invalid amount";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  // ================= STATE UPDATES =================

  /**
   * Generic change handler for all fields
   *
   * @param {string} name - Field name
   * @param {*} value - New value
   */
  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
      date: formData.date || new Date().toISOString().slice(0, 10)
    }));

    clearError(name);
  };


  // ================= SUBMISSION =================

  /**
   * Handles form submission
   *
   * @param {Event} e - Submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (formContent.onSubmit) {
      if (group) {
        formContent.onSubmit(formData, group);
      } else {
        formContent.onSubmit(formData);
      }
    }

    setFormData(defaultState);
    setErrors({});
    goBack();
  };


  // ================= RENDER =================

  return (
    <form onSubmit={handleSubmit} className="form">

      {(formContent.feilds || []).map(feild => {
        const Component = feild.Component;
        const { name, id } = feild.props;

        return (
          <Component
            key={id || name}
            {...feild.props}
            value={formData[name] ?? ""}
            onChange={(val) => handleChange(name, val)}
            checked={formData[name] ?? false}
            error={errors[name]}
          />
        );
      })}

      <WideButton
        {...formContent.buttonData}
        disabled={Object.keys(errors).length > 0}
      />
    </form>
  );
}

export default FormTemplate;

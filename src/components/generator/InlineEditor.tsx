import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Edit3, Check, X, Plus, Trash2 } from 'lucide-react';

interface InlineEditorProps {
  content: {
    headline: string;
    description: string;
    features: string[];
    callToAction: string;
    trustSignals: string[];
    faq: Array<{
      question: string;
      answer: string;
    }>;
  };
  onContentChange: (content: any) => void;
  onExit: () => void;
}

export const InlineEditor = ({ content, onContentChange, onExit }: InlineEditorProps) => {
  const [editedContent, setEditedContent] = useState(content);
  const [editingField, setEditingField] = useState<string | null>(null);

  const handleSave = () => {
    onContentChange(editedContent);
    onExit();
  };

  const updateField = (field: string, value: any) => {
    setEditedContent({ ...editedContent, [field]: value });
  };

  const addFeature = () => {
    updateField('features', [...editedContent.features, 'New feature']);
    setEditingField(`feature-${editedContent.features.length}`);
  };

  const removeFeature = (index: number) => {
    updateField('features', editedContent.features.filter((_, i) => i !== index));
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...editedContent.features];
    newFeatures[index] = value;
    updateField('features', newFeatures);
  };

  const addTrustSignal = () => {
    updateField('trustSignals', [...editedContent.trustSignals, 'New trust signal']);
    setEditingField(`trust-${editedContent.trustSignals.length}`);
  };

  const removeTrustSignal = (index: number) => {
    updateField('trustSignals', editedContent.trustSignals.filter((_, i) => i !== index));
  };

  const updateTrustSignal = (index: number, value: string) => {
    const newSignals = [...editedContent.trustSignals];
    newSignals[index] = value;
    updateField('trustSignals', newSignals);
  };

  const addFAQ = () => {
    updateField('faq', [...editedContent.faq, { question: 'New question?', answer: 'New answer' }]);
  };

  const removeFAQ = (index: number) => {
    updateField('faq', editedContent.faq.filter((_, i) => i !== index));
  };

  const updateFAQ = (index: number, field: 'question' | 'answer', value: string) => {
    const newFAQ = [...editedContent.faq];
    newFAQ[index] = { ...newFAQ[index], [field]: value };
    updateField('faq', newFAQ);
  };

  const EditableText = ({ 
    fieldId, 
    value, 
    onChange, 
    multiline = false, 
    placeholder = "Click to edit" 
  }: {
    fieldId: string;
    value: string;
    onChange: (value: string) => void;
    multiline?: boolean;
    placeholder?: string;
  }) => {
    const isEditing = editingField === fieldId;

    if (isEditing) {
      const Component = multiline ? Textarea : Input;
      return (
        <div className="flex items-center gap-2">
          <Component
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => setEditingField(null)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !multiline) {
                setEditingField(null);
              }
              if (e.key === 'Escape') {
                setEditingField(null);
              }
            }}
            autoFocus
            className="flex-1"
          />
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setEditingField(null)}
          >
            <Check className="h-4 w-4" />
          </Button>
        </div>
      );
    }

    return (
      <div
        className="flex items-center gap-2 cursor-pointer hover:bg-accent/10 p-2 rounded border-2 border-dashed border-transparent hover:border-accent/30 transition-colors group"
        onClick={() => setEditingField(fieldId)}
      >
        <span className="flex-1">{value || placeholder}</span>
        <Edit3 className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button onClick={handleSave} variant="premium">
            <Check className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
          <Button onClick={onExit} variant="outline">
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>

          <div className="space-y-6">
            {/* Headline */}
            <div>
              <label className="text-sm font-medium mb-2 block">Headline</label>
              <EditableText
                fieldId="headline"
                value={editedContent.headline}
                onChange={(value) => updateField('headline', value)}
                placeholder="Enter headline"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <EditableText
                fieldId="description"
                value={editedContent.description}
                onChange={(value) => updateField('description', value)}
                multiline
                placeholder="Enter description"
              />
            </div>

            {/* Call to Action */}
            <div>
              <label className="text-sm font-medium mb-2 block">Call to Action</label>
              <EditableText
                fieldId="cta"
                value={editedContent.callToAction}
                onChange={(value) => updateField('callToAction', value)}
                placeholder="Enter call to action"
              />
            </div>

            {/* Features */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Features</label>
                <Button size="sm" onClick={addFeature} variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Feature
                </Button>
              </div>
              <div className="space-y-2">
                {editedContent.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <EditableText
                      fieldId={`feature-${index}`}
                      value={feature}
                      onChange={(value) => updateFeature(index, value)}
                      placeholder="Enter feature"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFeature(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Signals */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Trust Signals</label>
                <Button size="sm" onClick={addTrustSignal} variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Signal
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {editedContent.trustSignals.map((signal, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      {editingField === `trust-${index}` ? (
                        <Input
                          value={signal}
                          onChange={(e) => updateTrustSignal(index, e.target.value)}
                          onBlur={() => setEditingField(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') setEditingField(null);
                            if (e.key === 'Escape') setEditingField(null);
                          }}
                          autoFocus
                          className="h-6 text-xs"
                        />
                      ) : (
                        <span
                          className="cursor-pointer"
                          onClick={() => setEditingField(`trust-${index}`)}
                        >
                          {signal}
                        </span>
                      )}
                      <button
                        onClick={() => removeTrustSignal(index)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">FAQ</label>
                <Button size="sm" onClick={addFAQ} variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  Add FAQ
                </Button>
              </div>
              <div className="space-y-4">
                {editedContent.faq.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Question {index + 1}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFAQ(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <EditableText
                      fieldId={`faq-q-${index}`}
                      value={item.question}
                      onChange={(value) => updateFAQ(index, 'question', value)}
                      placeholder="Enter question"
                    />
                    <EditableText
                      fieldId={`faq-a-${index}`}
                      value={item.answer}
                      onChange={(value) => updateFAQ(index, 'answer', value)}
                      multiline
                      placeholder="Enter answer"
                    />
                  </div>
                ))}
              </div>
            </div>
      </div>
    </div>
  );
};
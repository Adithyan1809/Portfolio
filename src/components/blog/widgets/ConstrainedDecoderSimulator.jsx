import React, { useState } from 'react';
import { Terminal, ShieldCheck, Play, RotateCcw, Lock } from 'lucide-react';

const STEPS = [
  {
    step: 0,
    generated: '{\n  "severity": ',
    nextExpected: 'Enum value quote (`"`)',
    allowedTokens: [
      { token: '"', prob: '99.4%', status: 'ALLOWED' },
      { token: ' "', prob: '0.6%', status: 'ALLOWED' }
    ],
    maskedTokens: [
      { token: '10', reason: 'violates schema string type', status: 'MASKED' },
      { token: 'null', reason: 'non-nullable field', status: 'MASKED' },
      { token: 'Sure', reason: 'conversational chatter', status: 'MASKED' },
      { token: '```', reason: 'markdown boundary', status: 'MASKED' }
    ]
  },
  {
    step: 1,
    generated: '{\n  "severity": "',
    nextExpected: 'Allowed enum ("LOW", "MEDIUM", "HIGH", "CRITICAL")',
    allowedTokens: [
      { token: 'CRITICAL', prob: '68.2%', status: 'ALLOWED' },
      { token: 'HIGH', prob: '21.5%', status: 'ALLOWED' },
      { token: 'MEDIUM', prob: '8.1%', status: 'ALLOWED' },
      { token: 'LOW', prob: '2.2%', status: 'ALLOWED' }
    ],
    maskedTokens: [
      { token: 'SEVERE', reason: 'not in enum definition', status: 'MASKED' },
      { token: 'URGENT', reason: 'not in enum definition', status: 'MASKED' },
      { token: 'unknown', reason: 'not in enum definition', status: 'MASKED' }
    ]
  },
  {
    step: 2,
    generated: '{\n  "severity": "CRITICAL',
    nextExpected: 'Closing quote (`"`)',
    allowedTokens: [
      { token: '"', prob: '100.0%', status: 'ALLOWED' }
    ],
    maskedTokens: [
      { token: '!', reason: 'invalid punctuation', status: 'MASKED' },
      { token: ' severity', reason: 'violates enum length', status: 'MASKED' },
      { token: ',', reason: 'string must be closed first', status: 'MASKED' }
    ]
  },
  {
    step: 3,
    generated: '{\n  "severity": "CRITICAL",\n  "confidence_score": 0.98\n}',
    nextExpected: 'End of Stream (EOS) reached — Valid JSON Guaranteed!',
    allowedTokens: [
      { token: '<|im_end|>', prob: '100.0%', status: 'ALLOWED' }
    ],
    maskedTokens: [
      { token: 'Hope this helps!', reason: 'post-generation chat blocked', status: 'MASKED' },
      { token: '\n\nNote:', reason: 'unsolicited notes blocked', status: 'MASKED' }
    ]
  }
];

export default function ConstrainedDecoderSimulator() {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const current = STEPS[currentStepIdx];

  const handleNext = () => {
    if (currentStepIdx < STEPS.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIdx(0);
  };

  return (
    <div className="interactive-widget-card">
      <div className="widget-header">
        <div className="widget-badge mono-text">
          <ShieldCheck size={13} className="pulsing-icon" />
          <span>LIVE CONSTRAINED LOGIT MASKING SIMULATOR</span>
        </div>
        <h4 className="widget-title">Grammar-Guided Finite State Machine (CFSM)</h4>
        <p className="widget-desc">
          Click through generation steps to observe how invalid tokens have their logits masked to $-\infty$ in real time.
        </p>
      </div>

      {/* Editor & State Display */}
      <div className="decoder-editor-container">
        <div className="decoder-editor-header mono-text">
          <span>GENERATION STREAM (STEP {currentStepIdx + 1} OF {STEPS.length})</span>
          <span className="decoder-status-tag">
            <Lock size={12} /> CFSM ACTIVE
          </span>
        </div>
        <pre className="decoder-code mono-text">
          <code>{current.generated}</code>
          {currentStepIdx < STEPS.length - 1 && <span className="decoder-cursor" />}
        </pre>
      </div>

      {/* Step Target Notice */}
      <div className="decoder-target-banner mono-text">
        <span>Awaiting Grammar State:</span> <strong>{current.nextExpected}</strong>
      </div>

      {/* Token Masking Grid */}
      <div className="decoder-tokens-grid">
        {/* Allowed Tokens */}
        <div className="token-column token-col-allowed">
          <div className="token-col-title mono-text">
            <span className="dot dot-green" />
            <span>ALLOWED LOGITS ($M_t = 0$)</span>
          </div>
          <div className="token-list">
            {current.allowedTokens.map((t) => (
              <div key={t.token} className="token-item item-allowed mono-text">
                <span className="token-name"><code>{t.token}</code></span>
                <span className="token-prob">{t.prob}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Masked Tokens */}
        <div className="token-column token-col-masked">
          <div className="token-col-title mono-text">
            <span className="dot dot-red" />
            <span>MASKED LOGITS ($M_t = -\infty$)</span>
          </div>
          <div className="token-list">
            {current.maskedTokens.map((t) => (
              <div key={t.token} className="token-item item-masked mono-text">
                <span className="token-name"><code>{t.token}</code></span>
                <span className="token-reason">{t.reason}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="decoder-actions-row">
        {currentStepIdx < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="btn btn-secondary mono-text btn-step-next"
          >
            <Play size={13} />
            <span>Step Next Token ({currentStepIdx + 1}/{STEPS.length})</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary mono-text btn-step-next"
          >
            <RotateCcw size={13} />
            <span>Restart Simulation</span>
          </button>
        )}
      </div>
    </div>
  );
}

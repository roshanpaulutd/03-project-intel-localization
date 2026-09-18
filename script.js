const RTL_LANGUAGE_CODES = new Set(['ar', 'he', 'fa', 'ur']);

function getDocumentLanguage() {
  return document.documentElement.lang.trim().toLowerCase().split('-')[0];
}

function isRtlLanguage(languageCode) {
  return RTL_LANGUAGE_CODES.has(languageCode);
}

function applyDocumentDirection(isRtl) {
  const documentRoot = document.documentElement;
  const bootstrapStylesheet = document.querySelector('#bootstrap-stylesheet');

  if (isRtl) {
    documentRoot.setAttribute('dir', 'rtl');
  } else {
    documentRoot.removeAttribute('dir');
  }

  document.body.classList.toggle('rtl', isRtl);

  if (bootstrapStylesheet) {
    bootstrapStylesheet.href = isRtl
      ? bootstrapStylesheet.dataset.rtlHref
      : bootstrapStylesheet.dataset.ltrHref;
  }
}

function updateDocumentDirection() {
  const languageCode = getDocumentLanguage();
  applyDocumentDirection(isRtlLanguage(languageCode));
}

function watchLanguageChanges() {
  const languageObserver = new MutationObserver(updateDocumentDirection);

  languageObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang']
  });
}

function initializeDirection() {
  updateDocumentDirection();
  watchLanguageChanges();
}

initializeDirection();

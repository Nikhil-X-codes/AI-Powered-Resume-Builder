import { useReactToPrint } from 'react-to-print'

export const usePdfPrint = (previewRef) =>
  useReactToPrint({
    contentRef: previewRef,
    documentTitle: 'resume',
    pageStyle: `
      @page { size: A4; margin: 20mm; }
      @media print { body { -webkit-print-color-adjust: exact; -webkit-print-color-adjust: exact; } }
    `,
  })

export const downloadAsPdf = (printFn) => {
  if (typeof printFn === 'function') {
    printFn()
  }
}

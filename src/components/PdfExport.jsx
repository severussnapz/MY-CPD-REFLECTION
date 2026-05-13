import { jsPDF } from 'jspdf'

export default function PdfExport({ reflection, insights }) {
  const handlePdfExport = async () => {
    try {
      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      const margin = 15
      const maxWidth = pageWidth - 2 * margin
      let yPosition = margin

      // Title
      doc.setFontSize(18)
      doc.setFont(undefined, 'bold')
      doc.text('CPD Reflection Report', margin, yPosition)
      yPosition += 15

      // Date
      doc.setFontSize(10)
      doc.setFont(undefined, 'normal')
      const date = new Date().toLocaleDateString()
      doc.text(`Generated: ${date}`, margin, yPosition)
      yPosition += 10

      // Reflection Section
      doc.setFontSize(12)
      doc.setFont(undefined, 'bold')
      doc.text('Your Reflection:', margin, yPosition)
      yPosition += 8

      doc.setFontSize(10)
      doc.setFont(undefined, 'normal')
      const reflectionLines = doc.splitTextToSize(reflection, maxWidth)
      doc.text(reflectionLines, margin, yPosition)
      yPosition += reflectionLines.length * 5 + 10

      // Check if we need a new page
      if (yPosition > pageHeight - 40) {
        doc.addPage()
        yPosition = margin
      }

      // Insights Section
      doc.setFontSize(12)
      doc.setFont(undefined, 'bold')
      doc.text('AI Insights:', margin, yPosition)
      yPosition += 8

      doc.setFontSize(10)
      doc.setFont(undefined, 'normal')
      const insightLines = doc.splitTextToSize(insights, maxWidth)
      doc.text(insightLines, margin, yPosition)

      // Save the PDF
      doc.save(`cpd-reflection-${new Date().toISOString().split('T')[0]}.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF')
    }
  }

  return (
    <button
      onClick={handlePdfExport}
      className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
    >
      📄 Export to PDF
    </button>
  )
}

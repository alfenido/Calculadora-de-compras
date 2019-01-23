class calculadoraDeCompras {
  constructor() {
    this.dados = {
      itemA: {
        valor: parseFloat(
          $("input[name=valor_itemA]").maskMoney("unmasked")[0]
        ),
        qnt: parseFloat($("input[name=quantidade_itemA]").val()),
        ppu: 0
      },
      itemB: {
        valor: parseFloat(
          $("input[name=valor_itemB]").maskMoney("unmasked")[0]
        ),
        qnt: parseFloat($("input[name=quantidade_itemB]").val()),
        ppu: 0
      }
    };
  }

  updateData() {
    this.dados = {
      itemA: {
        valor: parseFloat(
          $("input[name=valor_itemA]").maskMoney("unmasked")[0]
        ),
        qnt: parseFloat($("input[name=quantidade_itemA]").val()),
        ppu: 0
      },
      itemB: {
        valor: parseFloat(
          $("input[name=valor_itemB]").maskMoney("unmasked")[0]
        ),
        qnt: parseFloat($("input[name=quantidade_itemB]").val()),
        ppu: 0
      }
    };
  }
  getPPU() {
    this.updateData();
    let ok = 0;
    if (!isNaN(this.dados.itemA.valor) && !isNaN(this.dados.itemA.qnt)) {
      this.dados.itemA.ppu = this.dados.itemA.valor / this.dados.itemA.qnt;
      this.renderPPUItemA();
      ok++;
    }
    if (!isNaN(this.dados.itemB.valor) && !isNaN(this.dados.itemB.qnt)) {
      this.dados.itemB.ppu = this.dados.itemB.valor / this.dados.itemB.qnt;
      this.renderPPUItemB();
      ok++;
    }
    if (ok == 2) {
      this.runMath();
    }
    return true;
  }
  renderPPUItemA() {
    $("input[name=itemA_PPU]").val("R$ " + this.dados.itemA.ppu.toFixed(2));
    $(".inputAppResults, .inputAppItemA").animate({
      opacity: 1,
      border: 0
    });
  }
  renderPPUItemB() {
    $("input[name=itemB_PPU]").val("R$ " + this.dados.itemB.ppu.toFixed(2));
    $(".inputAppResults, .inputAppItemB").animate({
      opacity: 1,
      border: 0
    });
  }
  runMath() {
    if (this.dados.itemA.ppu > this.dados.itemB.ppu) {
      let percent = (this.dados.itemB.ppu / this.dados.itemA.ppu - 1) * -100;
      $("#appResult").html(
        `
            <b style="border-bottom: 2px solid green"> Item B </b> ${percent.toFixed(
              0
            )}% mais barato que 
            <b style="border-bottom: 2px solid red">Item A </b> 
            `
      );
    } else if (this.dados.itemB.ppu > this.dados.itemA.ppu) {
      let percent = (this.dados.itemA.ppu / this.dados.itemB.ppu - 1) * -100;
      $("#appResult").html(
        `
            <b style="border-bottom: 2px solid green"> Item A </b> ${percent.toFixed(
              0
            )}% mais barato que 
            <b style="border-bottom: 2px solid red">Item B </b> 
            `
      );
    } else {
      $("#appResult").html(
        `
                <b>Item A</b> e <b>Item B</b> tem os custos por unidade
            <b style="border-bottom: 2px solid green"> Iguais </b> 
            `
      );
    }
    $(".resultadoGeral").animate({
      opacity: 1
    });
  }
}

$(document).ready(function() {
  $("input[name=valor_itemA]").maskMoney({
    prefix: "R$ ",
    decimal: ".",
    thousands: ""
  });
  $("input[name=valor_itemB]").maskMoney({
    prefix: "R$ ",
    decimal: ".",
    thousands: ""
  });

  var app = new calculadoraDeCompras();
  $("input[name=valor_itemA]").change(function() {
    app.getPPU();
  });
  $("input[name=valor_itemB]").change(function() {
    app.getPPU();
  });
  $("input[name=quantidade_itemA]").change(function() {
    app.getPPU();
  });
  $("input[name=quantidade_itemB]").change(function() {
    app.getPPU();
  });
});

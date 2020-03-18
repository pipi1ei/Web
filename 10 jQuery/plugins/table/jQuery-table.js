(function($){
  /**
   * 自定义生成表格插件
   * @param arrThead 表格的表头数据
   * @param arrTbody 表格的主体数据
   */
  $.prototype.table = function(arrThead,arrTbody){
    var $table = $('<table></table>');
    var $thead = $('<thead></thead>');
    var $tbody = $('<tbody></tbody>');

    var $headTr = $('<tr></tr>');
    for(let i in arrThead){
      var $th = $('<th></th>');
      $th.html(arrThead[i]);
      $headTr.append($th);
    }
    $thead.append($headTr);

    for(let i in arrTbody){
      var $tr = $('<tr></tr>');
      var $td = $('<td></td>');
      $td.html(parseInt(i)+1);
      $tr.append($td);
      for(let prop in arrTbody[i]){
        var $td = $('<td></td>')
        $td.html(arrTbody[i][prop])
        $tr.append($td);
      }
      $tbody.append($tr);
    }

    $table.append($thead);
    $table.append($tbody);
    this.append($table)
  }
}(window.jQuery))